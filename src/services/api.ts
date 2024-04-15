export async function getMenu(): Promise<IMenuItem[]>{
    const result = await fetch("./mockData.json").then((response) => {
            if(!response.ok) {
                throw Error('Could not fetch the menu item data')
            }
            return response.json();
        }).catch((error) => console.error("Error loading JSON file", error));
    return result;
}