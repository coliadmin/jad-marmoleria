"use client";
import {Mail} from "lucide-react";
import {useState} from "react";

import {Button} from "./ui/button";

import {cn} from "@/lib/utils";
import {quicksand} from "@/fonts";

type EmailProps = {
  email: string;
};

export default function Email({email}: EmailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles:", err);
        alert("No se pudo copiar el correo electrónico.");
      });
  };

  return (
    <div className="relative flex items-center">
      <Button
        className={cn(
          "flex gap-2 p-0 text-sm font-medium text-white hover:no-underline",
          quicksand.className,
        )}
        variant="link"
        onClick={handleCopyClick}
      >
        <Mail className="mt-icon size-5" />
        <span className="tracking-widest">{email}</span>
      </Button>
      <span
        className={cn(
          "absolute left-full ml-2 whitespace-nowrap text-sm text-amber-300 transition-opacity duration-300 ease-in-out",
          copied ? "opacity-100" : "opacity-0",
        )}
      >
        ¡Copiado!
      </span>
    </div>
  );
}
