"use client";
import { useParams } from "next/navigation";
import React from "react";

const DetailPage = () => {
  const { type, id } = useParams();
  return (
    <div>
      DetailPage
      <div>
        {type}=={id}
      </div>
    </div>
  );
};

export default DetailPage;
