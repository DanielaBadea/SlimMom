import React from "react";
import css from './DiaryProductsList.module.css'
import DiaryProductsListItem from "../DiaryProductsListItem/DiaryProductsListItem";
import { useDispatch } from "react-redux";
import { fetchRemoveProduct } from "../../redux/diary/operations";

const DiaryProductsList = ({consumedProducts, selectedDate }) => {
    const dispatch = useDispatch();

    const handleDeleteProduct = async (productId) => {
        console.log("Product Id removed:", productId)
        const dateString = selectedDate.toISOString(); 
        await dispatch(fetchRemoveProduct({ date: dateString, productId }));
    };

    return (
        <div className={css.wrapperList}>
            {consumedProducts.length === 0 ? (
                <p>No products consumed for this date.</p>
            ) : (
                consumedProducts.map((product) => (
                    <DiaryProductsListItem key={product._id} product={product}
                        onDelete={() => handleDeleteProduct(product.productId._id)} />
                ))
            )}
        </div>
    );
};
export default DiaryProductsList;