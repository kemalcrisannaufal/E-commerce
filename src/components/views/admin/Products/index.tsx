import AdminLayout from "@/components/layouts/Admin";
import Button from "@/components/ui/Button";
import { Product } from "@/types/product.type";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import Title from "@/components/ui/Text/Title";
import ModalAddProduct from "./ModalAddProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ProductTable from "./ProductTable";
import ProductTableSkeleton from "./ProductTable/skeleton";

type Proptypes = {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
};

const ProductAdminViews = (props: Proptypes) => {
  const { products, setProducts } = props;
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | object>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | object>({});

  return (
    <>
      <AdminLayout>
        <div className="flex md:flex-row flex-col md:justify-between md:items-center w-full">
          <Title>Product Management</Title>
          <Button
            type="button"
            variant="primary"
            onClick={() => setModalAddProduct(true)}
            classname="md:mt-0 mt-3 w-max justify-self-end"
          >
            <i className="bx bx-plus" />
            <span>Add Product</span>
          </Button>
        </div>
        {products.length === 0 ? (
          <ProductTableSkeleton />
        ) : (
          <ProductTable
            products={products}
            setUpdatedProduct={setUpdatedProduct}
            setDeletedProduct={setDeletedProduct}
          />
        )}
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setProducts={setProducts}
        />
      )}

      {Object.keys(updatedProduct).length > 0 && (
        <ModalUpdateProduct
          updatedProduct={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
        />
      )}

      {deletedProduct && Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteProduct
          deletedProduct={deletedProduct}
          setDeletedProduct={setDeletedProduct}
          setProductsData={setProducts}
        />
      )}
    </>
  );
};

export default ProductAdminViews;
