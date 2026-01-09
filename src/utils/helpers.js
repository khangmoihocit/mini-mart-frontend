import cartService from "@/apis/cartService";

export const formatErrorMessage = (error) => {
    if (error.response) {
        return error.response.data.message || 'Đã xảy ra lỗi từ server';
    }
    if (error.request) {
        return 'Không thể kết nối đến server';
    }
    return error.message || 'Đã xảy ra lỗi không xác định';
};

export const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
};

export const handleAddProductToCartCommon = (
  userId,
  setIsOpen,
  setType,
  toast,
  sizeChoose,
  productId,
  quantity,
  setIsLoading,
  handleGetListProductsCart
) => {
  if (!userId) {
    setIsOpen(true);
    setType('login');
    toast.warning('Please login to add product to cart!');

    return;
  }

  if (!sizeChoose) {
    toast.warning('Please choose size!');
    return;
  }

  const data = {
    userId,
    productId,
    quantity,
    size: sizeChoose,
  };

  setIsLoading(true);
  cartService.addToCart(data)
    .then((res) => {
      setIsOpen(true);
      setType('cart');
      setIsLoading(false);
      handleGetListProductsCart(userId, 'cart');
    })
    .catch((err) => {
      toast.error('Add Product to cart failed!');
      setIsLoading(false);
    });
};

export const handleTotalPrice = (listProduct) => {
  return listProduct.reduce((acc, item) => {
    return acc + item.total;
  }, 0);
};