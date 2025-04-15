import { Favorite } from "@/types/favorite.type";
import { Product } from "@/types/product.type";
import FavoriteCard from "./FavoriteCard";
import Title from "@/components/ui/Text/Title";
import { userServices } from "@/services/user";
import { Dispatch, SetStateAction, useContext } from "react";
import { Cart } from "@/types/cart.type";
import { ToasterContext } from "@/contexts/ToasterContext";
import ProductToaster from "@/components/ui/Toaster/ProductToaster";
import { useRouter } from "next/router";

type Proptypes = {
  favorites: Favorite[];
  setFavorites: Dispatch<SetStateAction<Favorite[]>>;
  setCart: Dispatch<SetStateAction<Cart[]>>;
  products: Product[];
  cart: Cart[];
};
const FavoriteView = (props: Proptypes) => {
  const { favorites, products, setFavorites, cart, setCart } = props;
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();

  const handleDeleteFavorite = async (productId: string) => {
    const newFavorites: Favorite[] = favorites.filter(
      (item) => item.productId !== productId
    );

    const data = {
      favorites: newFavorites,
    };

    const result = await userServices.deleteFavorite(data);

    if (result.status === 200) {
      setFavorites(newFavorites);
    }
  };

  const handleAddToCart = async (productId: string, size: string) => {
    const newCart = [...cart, { productId, size, qty: 1 }];
    const data: { cart: Cart[] } = {
      cart: newCart,
    };

    const result = await userServices.addToCart(data);

    if (result.status === 200) {
      setCart(newCart);
      const product = products.find((item) => item.id === productId);
      if (product) {
        setToaster({
          variant: "custom",
          message: "Added to cart successfully!",
          children: (
            <ProductToaster
              image={product.mainImage}
              {...product}
              actionLabel="View Cart"
              actionOnClick={() => router.push("/cart")}
            />
          ),
        });
      }
    }
  };

  return (
    <div className="p-5 md:px-20 lg:px-10 lg:pt-12 lg:pb-10">
      {favorites && favorites.length > 0 ? (
        <div>
          <Title variant="small">Favourites</Title>
          <div className="gap-3 gap-y-10 lg:gap-5 grid grid-cols-2 lg:grid-cols-3 mt-3 lg:mt-5">
            {favorites.map((itemFavorite: Favorite, index: number) => {
              const product = products.find(
                (item) => item.id === itemFavorite.productId
              );
              return (
                <FavoriteCard
                  key={index}
                  favorite={itemFavorite}
                  product={product!}
                  handleDeleteFavorite={handleDeleteFavorite}
                  isProductInCart={cart.some(
                    (item: Cart) => item.productId === product?.id
                  )}
                  handleAddToCart={handleAddToCart}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-neutral-200 mt-3 lg:mt-5 p-3 w-full">
            <p>
              Your Favorite is empty. Start adding your favorite products! 😊🛒
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteView;
