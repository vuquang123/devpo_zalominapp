export interface RawStockItem {
  id: string; // This is actually the IMEI/Unit short ID
  ten_san_pham: string;
  loai_may: string;
  dung_luong: string;
  mau_sac: string;
  pin: string | number;
  imei: string;
  serial: string;
  tinh_trang: string;
  gia_ban: number;
  giam_gia: number;
  trang_thai: string;
  ngay_nhap: string;
  nguon: string;
  ghi_chu: string;
}

export interface StockUnit {
  id: string;
  imei: string;
  serial: string;
  color: string;
  battery: string | number;
  condition: string;
  price: number;
  discount: number;
  type: string; // QTE / Lock
  status: string;
  note: string;
}

export interface ProductStockGroup {
  id: string; // Group ID (e.g., "iphone-15-pro-max-256gb")
  name: string;
  storage: string;
  units: StockUnit[];
  minPrice: number;
  maxPrice: number;
  totalStock: number;
}
