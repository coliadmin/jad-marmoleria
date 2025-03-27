"use client";

import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Link } from "next-view-transitions";

export function BlocksRendererWrapper({
  content,
}: {
  content: BlocksContent;
}) {
  return (
    <div className="prose pt-6 lg:pt-0">
      <BlocksRenderer
        content={content}
        blocks={{link: ({ children, url }) => <Link href={url} target="_blank" rel="noopener noreferrer">{children}</Link>}}
      />
    </div>
  );
}
