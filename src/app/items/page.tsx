// Importamos el componente Link de Next.js para la navegación.
import Link from "next/link";

// Componente funcional ItemsPage que se encarga de realizar búsquedas y mostrar resultados.
export default async function ItemsPage({ searchParams }: { searchParams: { search: string } }) {
    // Realizamos una llamada a la API de MercadoLibre utilizando el término de búsqueda proporcionado.
    const { results } = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(searchParams.search)}&limit=4`).then(res => 
    //fetch('https://api.mercadolibre.com/sites/MLA/search?q=${:query}&limit=4') 
    //const {results} =await fetch('https://api.mercadolibre.com/sites/MLA/search?q=${searchParams.search}&limit=4'). 
    
    res.json() as Promise<{
            results: {
                name: string;
                lastname: string;
                categories: string;
                id: string;
                title: string;
                thumbnail: string;
                price: number;
                currency_id: string;
                condition: string;
                shipping: {
                    free_shipping: boolean;
                };
                seller_address: {
                    city: {
                        name: string;
                    };
                };
            }[];
        }>
    );

    // Renderizamos los resultados de la búsqueda en la UI.
    return (
        <section>
            <div className="productoDes">
                <article className="grid gap-2.5">
                    {/* Mapeamos cada resultado a un enlace con detalles del producto */}
                    {results.map(item => (
                        <Link href={`/items/${item.id}`} key={item.id} className="flex gap-4 py-3 px-2 border-b-2 ">
                            <img alt={item.title} src={item.thumbnail} className="productoImgPrin"/>
                            <div>
                                {/* Mostramos el precio, título y otros detalles del producto */}
                                <p className="text-xl font-bold currency">
                                    {Number(item.price).toLocaleString("es-AR", {
                                        style: "currency",
                                        currency: item.currency_id,
                                    })}
                                </p>
                                <p className="tituloItem">{item.title}</p>
                                <p>{item.condition}</p>
                                <p>{item.shipping.free_shipping ? 'Envío gratis' : 'Envío con costo'}</p>
                            </div>
                            <span className="ml-auto text-sm capitalize ciudad">
                                {item.seller_address.city.name.toLowerCase()}
                            </span>
                        </Link>
                    ))}
                </article>
            </div>
        </section>
    );
}
