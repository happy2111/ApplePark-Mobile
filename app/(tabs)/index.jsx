// EcommerceHome.jsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { productStore } from '../../store/ProductsStore';

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Oziq-ovqat', icon: 'fast-food', color: '#FFF5ED' },
  { id: '2', name: 'Sovg\'a', icon: 'gift', color: '#FFF1F2' },
  { id: '3', name: 'Kiyim', icon: 'shirt', color: '#F0F9FF' },
  { id: '4', name: 'Gadjet', icon: 'phone-portrait', color: '#F0FDF4' },
  { id: '5', name: 'Kompyuter', icon: 'laptop', color: '#FEF3C7' },
];

const banners = [
  {
    id: '1',
    title: 'Bepul yetkazib berish!',
    subtitle: 'Shartlar va qoidalar amal qiladi',
    bg: '#4F7CFF',
    icon: 'rocket',
  },
  {
    id: '2',
    title: 'CO2 - Kabel\nMultifunksional',
    subtitle: 'Hozir xarid qiling',
    bg: '#00D9A0',
    icon: 'headset',
  },
  {
    id: '3',
    title: 'Modulli\nNaushnik',
    subtitle: 'Hozir xarid qiling',
    bg: '#4F7CFF',
    icon: 'musical-notes',
  },
];

// Skeleton komponentlar
const SkeletonBox = ({ width: w, height: h, style }) => (
  <View
    style={[
      {
        width: w,
        height: h,
        backgroundColor: '#E2E8F0',
        borderRadius: 8,
      },
      style,
    ]}
  />
);

const ProductCardSkeleton = () => (
  <View style={styles.productCard}>
    <SkeletonBox width="100%" height={150} style={{ marginBottom: 8 }} />
    <SkeletonBox width="80%" height={16} style={{ marginBottom: 4 }} />
    <SkeletonBox width="60%" height={14} style={{ marginBottom: 4 }} />
    <SkeletonBox width="50%" height={12} />
  </View>
);

const BannerSkeleton = () => (
  <SkeletonBox
    width={width - 32}
    height={150}
    style={{ marginRight: 12, borderRadius: 16 }}
  />
);

// Mahsulot rasmlari
const getProductImage = (index) => {
  const images = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop',
  ];
  return images[index % images.length];
};

// Mahsulot kartochkasi
const ProductCard = observer(({ product, index }) => {
  const price = product?.organizations?.[0]?.price?.[3]?.amount || 0;

  const rating = (4.5 + (Math.random() * 0.5)).toFixed(1);
  const reviews = Math.floor(50 + Math.random() * 100);

  return (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: getProductImage(index) }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.productPrice}>
          {price.toLocaleString('uz-UZ')} so'm
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FACC15" />
          <Text style={styles.ratingText}>
            {rating}
          </Text>
          <Text style={styles.reviewCount}> | {reviews} ta sharh</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

// Bo'lim sarlavhasi
const SectionHeader = ({ title, onSeeAll }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={onSeeAll} style={styles.seeAllButton}>
      <Text style={styles.seeAllText}>Barchasini ko'rish</Text>
      <Ionicons name="chevron-forward" size={16} color="#FF7A00" />
    </TouchableOpacity>
  </View>
);

// Asosiy komponent
const EcommerceHome = observer(() => {
  useEffect(() => {
    // Ma'lumotlarni yuklash
    productStore.fetchProducts({ limit: 20, page: 1 });
  }, []);

  const handleSearch = () => {
    router.push('/search');
  };

  const { loading, products, error } = productStore;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.logo}>Apple Park Store</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#1E293B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="cart-outline" size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Qidiruv paneli */}
        <TouchableOpacity
          onPress={handleSearch}
          style={styles.searchBar}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={20} color="#64748B" />
          <Text style={styles.searchPlaceholder}>Mahsulot nomini qidiring</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Xato xabari */}
        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={24} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Bannerlar */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannerScroll}
          >
            {loading ? (
              <>
                <BannerSkeleton />
                <BannerSkeleton />
              </>
            ) : (
              banners.map((banner) => (
                <TouchableOpacity
                  key={banner.id}
                  style={[styles.banner, { backgroundColor: banner.bg }]}
                  activeOpacity={0.8}
                >
                  <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>{banner.title}</Text>
                    <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                  </View>
                  <View style={styles.bannerIconContainer}>
                    <Ionicons name={banner.icon} size={48} color="rgba(255,255,255,0.4)" />
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>

        {/* Kategoriyalar */}
        <View style={[styles.section, styles.paddedSection]}>
          <SectionHeader title="Kategoriyalar" onSeeAll={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryItem}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
                  <Ionicons name={cat.icon} size={28} color="#FF7A00" />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tavsiya etilgan mahsulotlar */}
        <View style={[styles.section, styles.paddedSection]}>
          <SectionHeader title="Tavsiya etilgan" onSeeAll={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {loading ? (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            ) : products.length > 0 ? (
              products.slice(0, 4).map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))
            ) : (
              <Text style={styles.emptyText}>Mahsulotlar topilmadi</Text>
            )}
          </ScrollView>
        </View>

        {/* Eng ko'p sotilgan */}
        <View style={[styles.section, styles.paddedSection]}>
          <SectionHeader title="Eng ko'p sotilgan" onSeeAll={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {loading ? (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            ) : products.length > 4 ? (
              products.slice(4, 8).map((product, index) => (
                <ProductCard key={product._id} product={product} index={index + 4} />
              ))
            ) : products.length > 0 ? (
              products.slice(0, 4).map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))
            ) : (
              <Text style={styles.emptyText}>Mahsulotlar topilmadi</Text>
            )}
          </ScrollView>
        </View>

        {/* Yangi mahsulotlar */}
        <View style={[styles.section, styles.paddedSection]}>
          <SectionHeader title="Yangi mahsulotlar" onSeeAll={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {loading ? (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            ) : products.length > 8 ? (
              products.slice(8, 12).map((product, index) => (
                <ProductCard key={product._id} product={product} index={index + 8} />
              ))
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))
            ) : (
              <Text style={styles.emptyText}>Mahsulotlar topilmadi</Text>
            )}
          </ScrollView>
        </View>

        {/* Yuqori baholangan */}
        <View style={[styles.section, styles.paddedSection]}>
          <SectionHeader title="Yuqori baholangan" onSeeAll={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {loading ? (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            ) : products.length > 0 ? (
              products.slice(0, 4).map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))
            ) : (
              <Text style={styles.emptyText}>Mahsulotlar topilmadi</Text>
            )}
          </ScrollView>
        </View>

        {/* Maxsus takliflar */}
        <View style={[styles.section, styles.paddedSection]}>
          <SectionHeader title="Maxsus takliflar" onSeeAll={() => {}} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {loading ? (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            ) : products.length > 12 ? (
              products.slice(12, 16).map((product, index) => (
                <ProductCard key={product._id} product={product} index={index + 12} />
              ))
            ) : products.length > 0 ? (
              products.slice(0, 4).map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))
            ) : (
              <Text style={styles.emptyText}>Mahsulotlar topilmadi</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF7A00',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
  },
  searchPlaceholder: {
    flex: 1,
    color: '#94A3B8',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 16,
  },
  paddedSection: {
    paddingHorizontal: 16,
  },
  bannerScroll: {
    paddingHorizontal: 16,
  },
  banner: {
    width: width - 32,
    height: 150,
    borderRadius: 16,
    marginRight: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  bannerIconContainer: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF7A00',
  },
  categoriesScroll: {
    gap: 20,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#64748B',
  },
  productCard: {
    width: width * 0.43,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  productInfo: {
    marginTop: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF7A00',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#94A3B8',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    gap: 8,
  },
  errorText: {
    flex: 1,
    color: '#EF4444',
    fontSize: 14,
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default EcommerceHome;