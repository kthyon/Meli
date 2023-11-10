
// Importamos dependencias necesarias
import React from 'react';

// Componente funcional ItemPage que recibe un 'id' como parámetro a través de las props.
export default async function ItemPage({ params: { id } }: { params: { id: string } }) {
  // Realizamos una llamada a la API de MercadoLibre para obtener los detalles del artículo.
  const item = await fetch(`https://api.mercadolibre.com/items/${id}`).then((res) =>
    res.json() as Promise<{
      id: string;
      title: string;
      thumbnail: string;
      price: number;
      currency_id: string;
      condition: string;
    }>
  );

  // Realizamos otra llamada a la API para obtener la descripción del artículo.
  const { plain_text } = await fetch(`https://api.mercadolibre.com/items/${id}/description`).then((res) =>
    res.json() as Promise<{ plain_text: string }>
  );

  // Renderizamos la información del artículo y su descripción en la interfaz de usuario.
  return (
    <section>
      <div className="productoDes px-4">
        <div className="producto-col1">
          {/* Mostramos la imagen del producto */}
          <img alt={item.title} src={item.thumbnail} className="productoImg" />
          {/* Mostramos la descripción del producto obtenida de la API */}
          {plain_text}
          <p className="pdptitle">Descripción del Producto</p>
          <p>
            Descubre la excelencia en cada detalle con nuestro producto de vanguardia, 
            diseñado para enriquecer tu vida diaria con una mezcla perfecta de funcionalidad y estilo. 
            Cada pieza es el resultado de un meticuloso proceso de fabricación donde la calidad 
            se cruza con la innovación para ofrecerte una experiencia incomparable.
          </p>
        </div>
        <div className="producto-col2">
          {/* Mostramos la condición del producto y la cantidad vendida */}
          <p>{item.condition} - 234 vendidos</p>
          {/* Título del producto */}
          <h3 className="text-xl font-bold">{item.title}</h3>
          {/* Precio del producto */}
          <p className="text-xl font-bold currencyDesc">
            {Number(item.price).toLocaleString("es-AR", {
              style: "currency",
              currency: item.currency_id,
            })}
          </p>
          {/* Botón de compra */}
          <button className="botonComprar" type="submit">Comprar</button>
        </div>
      </div>
    </section>
  );
}



