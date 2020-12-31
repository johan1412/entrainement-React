const PRODUCTS = [
    {category: "Electronics", price: "599.99", stocked: true, name: "nexus 7"},
    {category: "Electronics", price: "599.99", stocked: true, name: "nexus 7"},
    {category: "Electronics", price: "599.99", stocked: true, name: "nexus 7"},
    {category: "Electronics", price: "599.99", stocked: true, name: "nexus 7"},
    {category: "Electronics", price: "599.99", stocked: true, name: "nexus 7"}
];

function ProductTable ({products}) {

    render () {
        /*return <table className="table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prix</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>*/
        return "test";
    }

}

class FilterableProductTable extends React.Component {
    
    render () {
        const {products} = this.props
        return <ProductTable products={products}/>
    }

}

ReactDom.render(<FilterableProductTable products={PRODUCTS}/>, document.getElementById('app'))