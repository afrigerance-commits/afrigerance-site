import { createClient } from "@/lib/supabase/server";
import { BookEditor } from "@/components/admin/book-editor";
import { notFound } from "next/navigation";
export default async function Page({params}:PageProps<"/admin/livres/[id]">){
 const {id}=await params;const client=await createClient();const {data,error}=await client.from("books").select("*").eq("id",id).maybeSingle();
 if(error)return <p>La configuration des livres doit être activée avant de modifier cette fiche.</p>;
 if(!data)notFound();return <><h1 className="mb-6 font-display text-3xl">Modifier le livre</h1><BookEditor book={data}/></>;
}
