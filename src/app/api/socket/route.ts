// app/api/socket/route.ts (App Router)

import { NextRequest, NextResponse } from "next/server";
import { Server as SocketIOServer } from "socket.io";
import { createServer } from "http";
import { connect, Connection, Channel, ConsumeMessage } from "amqplib";

// Notification data type (adjust based on your actual data structure)
interface NotificationData {
  id?: string;
  message?: string;
  timestamp?: string;
  type?: string;
  userId?: string;
  [key: string]: any;
}

// Global variables to store connections
let io: SocketIOServer | null = null;
let isRabbitMQConnected = false;

// RabbitMQ connection config
const rabbitHost: string = process.env.RABBITMQ_HOST || "localhost";
const rabbitUserName: string = process.env.RABBITMQ_DEFAULT_USER || "guest";
const rabbitPassword: string = process.env.RABBITMQ_DEFAULT_PASS || "guest";

// Exchange and queue names
const exchange: string = "DOMAIN.Entities.Notifications:NotificationDto";
const queue: string = "push_notification_queue";

async function consumeMessages(): Promise<void> {
  if (isRabbitMQConnected) {
    console.log("📡 RabbitMQ already connected");
    return;
  }

  try {
    const connection: Connection = await connect(
      `amqp://${rabbitUserName}:${rabbitPassword}@${rabbitHost}`,
    );
    const channel: Channel = await connection.createChannel();

    // IMPORTANT: exchange name must exactly match what MassTransit used
    await channel.assertExchange(exchange, "fanout", { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, "");

    console.log(`✅ Bound queue '${queue}' to exchange '${exchange}'`);
    console.log(`📡 Waiting for messages in queue: '${queue}'`);

    channel.consume(queue, (msg: ConsumeMessage | null) => {
      if (msg !== null) {
        try {
          const data: NotificationData = JSON.parse(msg.content.toString());
          // console.log(data, "data from rabbitmq");
          if (io) {
            io.emit("notification", data);
            console.log("📥 Received message:", data);
          }
          channel.ack(msg);
        } catch (err) {
          console.error("❌ Error parsing message:", err);
        }
      }
    });

    isRabbitMQConnected = true;
  } catch (error) {
    console.error("🐛 RabbitMQ connection error:", error);
    isRabbitMQConnected = false;
  }
}

function initializeSocketIO(): void {
  if (io) {
    console.log("♻️ Socket.io server already running");
    return;
  }

  console.log("🔧 Setting up Socket.io server...");

  // Create HTTP server for Socket.io
  const httpServer = createServer();

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log("🔌 Frontend connected via Socket.io");

    socket.on("disconnect", () => {
      console.log("❌ Frontend disconnected");
    });
  });

  // Start the HTTP server on a different port for Socket.io
  const port = process.env.SOCKET_PORT || 3002;
  httpServer.listen(port, () => {
    console.log(`🚀 Socket.io server listening on port ${port}`);
  });

  // Start consuming messages
  consumeMessages().catch(console.error);
}

export async function GET(): Promise<NextResponse> {
  try {
    initializeSocketIO();

    return NextResponse.json({
      message: "Socket.io server initialized",
      status: "success",
      socketPort: process.env.SOCKET_PORT || 3002,
    });
  } catch (error) {
    console.error("Error initializing Socket.io:", error);
    return NextResponse.json(
      {
        message: "Failed to initialize Socket.io server",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    if (io) {
      io.emit("notification", body);
      return NextResponse.json({
        message: "Notification sent",
        status: "success",
      });
    }

    return NextResponse.json(
      {
        message: "Socket.io server not initialized",
        status: "error",
      },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      {
        message: "Failed to send notification",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
