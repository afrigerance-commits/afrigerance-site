import { PagePlaceholder, placeholderMetadata } from "@/components/PagePlaceholder";
import { placeholderPages } from "@/content/site";

const page = placeholderPages.services;

export const metadata = placeholderMetadata(page);

export default function Page() {
  return <PagePlaceholder page={page} />;
}
