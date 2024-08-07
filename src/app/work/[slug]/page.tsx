import slugify from "slugify";
import MdxContent from "@/components/MdxContent";
import { getAllFrontmatters, getFrontmatter } from "@/utils/github_api";

export async function generateStaticParams() {
  const res: any = await getAllFrontmatters();
  const paths = res.map(({ data }: any) => ({
    slug: slugify(data.name, { lower: true }),
  }));
  return paths;
}

export default async function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const { slug } = params;
  const data: any = await getFrontmatter(slug);

  return (
    <>
      <MdxContent
        info={{
          title: data.data.name,
          intro: data.data.intro,
          date_range: [data.data.date.start, data.data.date.end],
        }}
        source={data.content}
        parentUrl="/work"
      />
    </>
  );
}
