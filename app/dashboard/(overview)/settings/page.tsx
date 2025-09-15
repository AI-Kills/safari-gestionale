'use client';
import { useState } from "react";
import { UserConfig } from "@/app/appConfig";
export default function Settings() {
  const [count, setCount] = useState(UserConfig.getInstance().getCount());
  return (
    <div>
      <h1 className="mb-4 text-xl md:text-2xl">SETTINGS</h1>
      <div>
        <p>Qui si possono mettere impostazioni globali</p>
      </div>
    </div>
  );
}


