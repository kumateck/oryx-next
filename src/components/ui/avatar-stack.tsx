import { type VariantProps } from "class-variance-authority";

import { avatarFallbackColors } from "@/lib";
import { avatarStackVariants, cn } from "@/lib/utils";

import ActionToolTip from "./action-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export interface AvatarStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarStackVariants> {
  avatars: { url?: string; name?: string; fullname?: string; color?: string }[];
  avatarsOffset?: number;
  maxAvatarsAmount?: number;
}

export function AvatarStack({
  className,
  orientation,
  avatars,
  spacing,
  avatarClass,
  fallbackClass,
  // avatarsOffset = 2,
  maxAvatarsAmount = 4,
  ...props
}: AvatarStackProps & { avatarClass?: string; fallbackClass?: string }) {
  const limitedAvatars = avatars.slice(0, maxAvatarsAmount);

  return (
    <div
      className={cn(
        avatarStackVariants({ orientation, spacing }),
        className,
        orientation === "horizontal" ? "-space-x-0" : "-space-y-0",
      )}
      {...props}
    >
      {limitedAvatars.map((avatar, index) => (
        <ActionToolTip key={index} title={avatar?.fullname as string}>
          <Avatar className={cn(avatarStackVariants(), avatarClass)}>
            <AvatarImage src={avatar?.url} className="object-cover" />
            <AvatarFallback
              className={cn(fallbackClass, avatarFallbackColors[index])}
            >
              {avatar?.name}
            </AvatarFallback>
          </Avatar>
        </ActionToolTip>
      ))}

      {limitedAvatars.length < avatars.length ? (
        <Avatar key={"Excesive avatars"}>
          <AvatarFallback>
            +{avatars.length - limitedAvatars.length}
          </AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  );
}

//
// export { AvatarStack, avatarStackVariants };
