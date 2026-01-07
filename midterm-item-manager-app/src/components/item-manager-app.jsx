import "./item-manager-app.css";

import { useState, useRef } from "react";

import deleteLogo from "../assets/delete.svg";
import stationaryLogo from "../assets/Stationary.svg";
import kitchenwareLogo from "../assets/Kitchenware.svg";
import applianceLogo from "../assets/Appliance.svg";

function ItemManager() {
  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);

  // Additional state (allowed)
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [nextId, setNextId] = useState(1);

  function categoryIcon(cat) {
    if (cat === "Stationary") return stationaryLogo;
    if (cat === "Kitchenware") return kitchenwareLogo;
    return applianceLogo;
  }

  function addItem() {
    const name = itemName.current.value.trim();
    const numericPrice = Number(price);

    if (name.length === 0) {
      setErrorMsg("Item name must not be empty");
      return;
    }

    if (items.some(it => it.name.toLowerCase() === name.toLowerCase())) {
      setErrorMsg("Item must not be duplicated");
      return;
    }

    if (category === "") {
      setErrorMsg("Please select a category");
      return;
    }

    if (numericPrice < 0) {
      setErrorMsg("Price must not be less than 0");
      return;
    }

    setItems([
      ...items,
      { id: nextId, name, category, price: numericPrice }
    ]);

    setNextId(nextId + 1);
    setErrorMsg("");
  }

  function deleteItem(id) {
    setItems(items.filter(it => it.id !== id));
  }

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  return (
    <>
      <div id="h1">Item Management</div>

      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Existing items */}
            {items.map(it => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>
                  <img
                    src={categoryIcon(it.category)}
                    alt={it.category}
                    className="category-icon"
                  />
                </td>
                <td>{it.price}</td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="Delete"
                    className="delete-icon"
                    onClick={() => deleteItem(it.id)}
                  />
                </td>
              </tr>
            ))}

            {/* Form row (MUST be the LAST row) */}
            <tr>
              <td></td>
              <td>
                <input ref={itemName} type="text" />
              </td>
              <td>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value=""></option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </td>
              <td>
                <button type="button" onClick={addItem}>
                  Add Item
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="error-message">{errorMsg}</div>
    </>
  );
}

export default ItemManager;
