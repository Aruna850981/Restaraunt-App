import './index.css'

const Category = props => {
  const {categories, activeIndex, onChange} = props

  return (
    <div className="tabs-container">
      {categories.map((category, index) => (
        <button
          key={category.menu_category_id}
          type="button"
          className={`tab-btn ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onChange(index)}
        >
          {category.menu_category}
        </button>
      ))}
    </div>
  )
}
export default Category
