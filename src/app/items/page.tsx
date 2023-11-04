import Link from "next/link";


export default async function ItemsPage({searchParams}: {searchParams: {search:string}}){
const {results} = await fetch('https://api.mercadolibre.com/sites/MLA/search?q=${:query}&limit=4').then((res)=> res.json() as Promise <{
    //const {results} =await fetch('https://api.mercadolibre.com/sites/MLA/search?q=${searchParams.search}&limit=4').
results:{
    
        name: string;
        lastname: string;
        categories: string;
        id: string;
        title: string;
        thumbnail: string;
        price: number;
        currency_id: string;
        condition:string;
        shipping:{
                free_shiping: boolean;
                 }
        
        seller_address:{
            city:{
                name:string;
                };
        }
    }[];
}>
);

    return <section>
    <div className="productoDes">
        <article className="grid gap-2.5 ">
            {results.map (item => (
            <Link href={`/items/${item.id}`} key={item.id} className="flex gap-4 py-3 px-2 border-b-2">

            <img alt={item.title} src={item.thumbnail} />
            <div>

                <p className="text-xl font-bold currency">
                    {Number(item.price).toLocaleString("es-AR",{
                    style: "currency",
                    currency:item.currency_id,})}
                </p>

                <p className="tituloItem">{item.title}</p>
                <p>{item.condition}</p>
                <p>{item.shipping.free_shiping}</p>
            </div>
            <span className="ml-auto text-sm  capitalize ciudad">
            {item.seller_address.city.name.toLowerCase()}
            </span>

            </Link>

            ))}
        </article>

    </div>

</section>
}