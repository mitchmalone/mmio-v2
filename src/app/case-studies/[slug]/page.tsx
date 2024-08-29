import MdxContent from "@/components/MdxContent";
import { getWorksDirContents, getMarkdownItems } from "@/utils/markdown_api";
import { markdownInlineImages } from "@/utils/remark";

export async function generateStaticParams() {
  const res: any = await getWorksDirContents();
  const paths = res.map(({ slug }: any) => ({
    slug,
  }));
  return paths;
}

export default async function Page({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const { slug } = params;
  const data: any = await getMarkdownItems(slug);
  const markdownContent = await markdownInlineImages(data.content, slug);

  return (
    <>
      <MdxContent
        info={{
          title: data.frontmatter.title,
          intro: data.frontmatter.intro,
          date_range: [data.frontmatter.startDate, data.frontmatter.endDate],
          image: data.frontmatter.image
            ? `/case-studies/${slug}/${data.frontmatter.image}`
            : null,
        }}
        source={markdownContent}
        parentUrl="/case-studies"
      />
    </>
  );
}
