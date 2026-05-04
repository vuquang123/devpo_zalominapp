import NoteInput from "@/components/common/note-input";
import { useState, useMemo, useEffect } from "react";
import CartFloatButton from "@/components/common/cart-float-button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BackIcon } from "@/components/common/vectors";
import { useProduct } from "@/services/product/product.queries";
import { useCartStore } from "@/stores/cart.store";
import { Button, Spinner, Text } from "zmp-ui";
import { copy } from "@/constants/copy";
import { formatCurrency } from "@/utils/format";
import UnitSelect from "./components/UnitSelect";
import { openChat } from "zmp-sdk/apis";

export default function ProductDetailPage() {
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const editCartItemId = searchParams.get("editCartItemId");
  const isEditMode = !!editCartItemId;

  const { data: product, isLoading, isError } = useProduct(id || "");
  const { addToCart, updateCartItem, items, totalItems } = useCartStore();

  const selectedUnit = useMemo(() => {
    return product?.stockUnits?.find((u) => u.id === selectedUnitId);
  }, [product, selectedUnitId]);

  useEffect(() => {
    if (product?.stockUnits?.length && !selectedUnitId && !isEditMode) {
      setSelectedUnitId(product.stockUnits[0].id);
    }
  }, [product, selectedUnitId, isEditMode]);

  useEffect(() => {
    if (!isEditMode || !editCartItemId || !product) return;

    const cartItem = items.find((item) => item.id === editCartItemId);
    if (!cartItem) return;

    setNote(cartItem.note || "");
    const unitVariant = cartItem.selectedVariants.find(v => v.groupId === "UNIT_SELECTION");
    if (unitVariant) {
      setSelectedUnitId(String(unitVariant.optionId));
    }
  }, [isEditMode, editCartItemId, items, product]);

  const totalPrice = useMemo(() => {
    if (!selectedUnit) return product?.price || 0;
    return selectedUnit.price;
  }, [product, selectedUnit]);

  const handleAddToCart = () => {
    if (!product || !selectedUnit) return;

    const selectedVariants = [
      {
        groupId: "UNIT_SELECTION",
        groupTitle: "Chi tiết máy",
        optionId: selectedUnit.id,
        optionName: `${selectedUnit.imei} (Pin ${selectedUnit.battery}%)`,
        extraPrice: 0, 
      }
    ];

    const cartItemData = {
      productId: Number(product.id),
      productName: product.name,
      productImage: product.image,
      basePrice: selectedUnit.price,
      selectedVariants,
      quantity: 1,
      note: note || undefined,
    };

    if (isEditMode && editCartItemId) {
      updateCartItem(editCartItemId, cartItemData);
    } else {
      addToCart(cartItemData);
    }

    navigate(-1);
  };

  const handleChat = async () => {
    if (!product) return;
    try {
      await openChat({
        type: "oa",
        id: "4289073059490896771",
        message: `Chào shop, mình quan tâm đến sản phẩm: ${product.name}. Tư vấn giúp mình nhé!`,
      });
    } catch (error) {
      console.log("Error opening chat", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <div className="text-center">
          <Spinner />
          <Text size="xSmall" className="mt-2 text-text-tertiary">
            Đang tải dữ liệu thực tế...
          </Text>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <div className="mx-8 text-center">
          <Text size="large" className="font-bold text-text-primary mb-2">Không tìm thấy máy</Text>
          <Text size="xSmall" className="text-text-tertiary">{copy.product.notFound}</Text>
          <Button onClick={() => navigate("/")} className="mt-6" size="small">Quay lại trang chủ</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-background">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-44">
        <div className="relative left-0 top-0">
          <img
            draggable={false}
            className="h-[360px] w-full object-cover"
            src={product.image}
            alt={product.name}
          />
          <div className="header-margin absolute left-0 top-0 z-10 flex h-12 w-full items-center gap-2 bg-transparent px-4 py-2">
            <Button
              className="w-fit bg-white/60 p-1 active:bg-white/90 rounded-full"
              type="neutral"
              size="small"
              onClick={() => navigate(-1)}
            >
              <BackIcon className="text-text-primary" />
            </Button>
            <div className="text-large-sb font-bold text-text-primary bg-white/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
              Chi tiết thiết bị
            </div>
          </div>
        </div>

        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <Text className="text-xxlarge-sb font-bold text-text-primary">{product.name}</Text>
            <Text className="text-xxlarge-sb text-primary">
              {formatCurrency(totalPrice)}
            </Text>
          </div>
          <Text className="mt-2 text-normal-m text-text-secondary leading-6">
            Dòng máy {product.name} đang sẵn hàng tại kho. Vui lòng chọn IMEI bên dưới để xem chi tiết tình trạng máy.
          </Text>
        </div>

        <div className="px-4 pb-4">
          {product.stockUnits && product.stockUnits.length > 0 ? (
             <UnitSelect 
               units={product.stockUnits} 
               selectedUnitId={selectedUnitId} 
               onSelect={setSelectedUnitId} 
             />
          ) : (
            <div className="mt-12 text-center py-10 bg-white rounded-2xl border border-dashed border-divider01 mx-2">
              <Text className="text-text-tertiary">Hiện tại tất cả máy này đã tạm hết hàng.</Text>
            </div>
          )}
          
          <NoteInput value={note} onChange={setNote} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-divider01 border-t bg-white/95 px-4 py-4 backdrop-blur-lg shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <Text className="text-xxsmall-m uppercase font-bold tracking-widest text-text-tertiary">Tổng thanh toán</Text>
            <Text className="text-xxlarge-sb font-black text-primary">
              {formatCurrency(totalPrice)}
            </Text>
          </div>
          <div className="text-right">
             <Text className="text-large-sb text-blue600 font-bold">
               {selectedUnit?.imei ? `Đã chọn: ${selectedUnit.imei.slice(-4)}...` : "Chưa chọn IMEI"}
             </Text>
             <Text className="text-xxsmall-m text-text-tertiary">
               Giá bảo hành 12 tháng
             </Text>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleChat}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 p-0 text-blue600 transition-all active:scale-95 active:bg-blue-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={!selectedUnit}
            fullWidth
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 text-large-sb font-bold text-white transition-all transform active:scale-95 ${
              selectedUnit ? "bg-blue500 shadow-md" : "bg-neutral300"
            }`}
          >
            {isEditMode ? "Cập nhật lựa chọn" : "Mua ngay đúng máy này"}
          </Button>
        </div>
        <CartFloatButton itemCount={totalItems} />
      </div>
    </div>
  );
}
