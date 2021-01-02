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

    constructor (props) {
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange (e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockChange (e) {
        this.props.onStockChange(e.target.checked)
    }

    render () {
        const {filterText, inStockOnly} = this.props

        return <div className="mb-5">
            <div className="form-group">
                <input type="text" value={filterText} classname="form-control" placeholder="Rechercher..." onChange={this.handleFilterTextChange}/>
            </div>
            <div className="custom-control custom-checkbox">
                <input type="checkbox" checked={inStockOnly} className="custom-control-input" id="stock" onChange={this.handleInStockChange}/>
                <label htmlFor="stock" className="custom-control-label">Produit en stock seulement</label>
            </div>
        </div>
    }
}


function ProductTable ({products, filterText, inStockOnly}) {
    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
        if (inStockOnly && !product.stocked) {
            return
        }
        if (product.name.indexOf(filterText) === -1) {
            return
        }
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

    constructor (props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockChange = this.handleInStockChange.bind(this)
    }

    handleFilterTextChange (filterText) {
        this.setState({filterText})
    }

    handleInStockChange (inStockOnly) {
        this.setState({inStockOnly})
    }
    
    render () {
        const {products} = this.props
        return <React.Fragment>
            <SearchBar
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterTextChange}
                onStockChange={this.handleInStockChange}
            />
            <ProductTable
                products={products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
            />
        </React.Fragment>
    }

}

ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('app')
)