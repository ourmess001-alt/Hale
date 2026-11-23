import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <ProductDetailClient product={product} otherProducts={otherProducts} />
  );
}
