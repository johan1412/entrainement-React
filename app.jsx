const PRODUCTS = [
    {category: "Electronics", price: "599.99", stocked: true, name: "nexus 7"},
    {category: "Electronics", price: "199.99", stocked: true, name: "nexus 4"},
    {category: "Electronics", price: "45.99", stocked: true, name: "samsung s9"},
    {category: "Electronics", price: "127.99", stocked: false, name: "iphone 8"},
    {category: "Electronics", price: "58.99", stocked: true, name: "sony xm3"},
    {category: "Sports", price: "99.99", stocked: true, name: "football"},
    {category: "Sports", price: "79.99", stocked: false, name: "basketball"},
    {category: "Sports", price: "109.99", stocked: true, name: "tennis"},
    {category: "Sports", price: "45.99", stocked: false, name: "athletisme"}
];


function ProductRow ({product}) {
    const name = product.stocked ? product.name : <span className="text-danger">{product.name}</span>
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
}


function ProductCategoryRow ({category}) {
    return <tr>
        <th className="pt-5" colSpan="2">{category}</th>
    </tr>
}


class SearchBar extends React.Component {

    render () {
        return <div className="mb-5">
            <div className="form-group">
                <input type="text" classname="form-control" placeholder="Rechercher..."/>
            </div>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="stock" />
                <label htmlFor="stock" className="custom-control-label">Produit en stock seulement</label>
            </div>
        </div>
    }
}


function ProductTable ({products}) {
    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
        if (product.category !== lastCategory) {
            lastCategory = product.category;
            rows.push(<ProductCategoryRow key={product.category} category={product.category}/>)
        }
        rows.push(<ProductRow key={product.name} product={product}/>)
    })

    return <table className="table text-white-50">
        <thead>
            <tr>
                <th>NOM</th>
                <th>PRIX</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>

}

class FilterableProductTable extends React.Component {
    
    render () {
        const {products} = this.props
        return <React.Fragment>
            <SearchBar/>
            <ProductTable products={products}/>
        </React.Fragment>
    }

}

ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('app')
)