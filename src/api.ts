const api={
    item:{
        fetch(id:string) =>{
            const item = await fetch(`https://api.mercadolibre.com/items/${id}`).then(
        (res) => 
        res.json() as Promise<{ 
          id: string;
          title: string;
          thumbnail: string;
          price: number;
          currency_id: string;  
          condition:string;
        }>,
      );

const {plain_text}= await fetch(`https://api.mercadolibre.com/items/${id}/description`).then(
    (res)=> 
    res.json() as Promise <{ 
        plain_text: string;  
}>,
);

return {
    ...item,
    description: plain_text;
}
        },
search: (query: string) => 
fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`).then(
(res) =>
 res.json() as Promise <{
    
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
        }>,
);