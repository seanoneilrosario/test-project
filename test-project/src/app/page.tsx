import Product from '@/components/Product'

export default async function Home() {

  let productData;
    const response = await fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product");
    const data = await response.json();
    productData = data

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-[20px] px-[20px] md:px-[50px]">
      <Product data={productData} />
    </main>
  )
}
