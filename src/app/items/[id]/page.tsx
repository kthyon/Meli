export default async function ItemPage({ params: { id } }: { params: { id: string } }) {

  const item = await fetch(`https://api.mercadolibre.com/items/${id}`).then(
  (res) =>
  res.json() as Promise<{ id: string; title: string; thumbnail: string; price: number; currency_id: string;
    condition:string; }>,
    );

  const {plain_text}= await fetch(`https://api.mercadolibre.com/items/${id}/description`).then(
  (res)=>
  res.json() as Promise <{ plain_text: string; }>,
    );

    return (<section>
  <div className="productoDes px-4">
    <div className="producto-col1">
      <img alt={item.title} src={item.thumbnail} className="productoImg" />

      {plain_text}
      <p className="pdptitle">Descripción del Producto</p>
      <p> Descubre la excelencia en cada detalle con nuestro producto de vanguardia, 
        diseñado para enriquecer tu vida diaria con una mezcla perfecta de funcionalidad y estilo. 
        Cada pieza es el resultado de un meticuloso proceso de fabricación donde la calidad 
        se cruza con la innovación para ofrecerte una experiencia incomparable. </p>


    </div>
    <div className="producto-col2">
      <p>{item.condition} - 234 vendidos</p>
      <h3 className="text-xl font-bold">{item.title} </h3>
      <p className="text-xl font-bold currencyDesc">
        {Number(item.price).toLocaleString("es-AR",{
        style: "currency",
        currency:item.currency_id,})}
      </p>
      <button className="botonComprar" type="submit">Comprar</button>
    </div>

  </div>

</section>);
    }


