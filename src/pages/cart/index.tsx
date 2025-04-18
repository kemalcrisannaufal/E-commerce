import CartView from "@/components/views/cart";
import Head from "next/head";
import { useCart } from "@/components/hooks/useCart";
import { useFavorite } from "@/components/hooks/useFavorite";

const CartPage = () => {
  const { cart, productsCart, isLoading, setCart } = useCart();
  const { favorites, setFavorites } = useFavorite();

  const getSubtotal = () => {
    const subtotal = cart.reduce((acc, item) => {
      const product = productsCart.find(({ id }) => id === item.productId);
      return acc + (product?.price ?? 0) * item.qty;
    }, 0);
    return subtotal;
  };

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <CartView
        cart={cart}
        isLoading={isLoading}
        setCart={setCart}
        favorites={favorites}
        setFavorites={setFavorites}
        productsCart={productsCart}
        subtotal={getSubtotal()}
      />
    </>
  );
};
export default CartPage;
