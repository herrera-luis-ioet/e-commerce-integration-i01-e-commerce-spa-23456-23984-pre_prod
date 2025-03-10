{"is_source_file": true, "format": "TypeScript", "description": "This file defines a Redux slice for managing product state in an e-commerce application, including actions and reducers for fetching products, selecting products, applying filters, and managing pagination.", "external_files": ["../../types/product.types"], "external_methods": ["axios.get"], "published": ["setProducts", "setSelectedProduct", "setFilterOptions", "applyFilters", "setCurrentPage", "setItemsPerPage", "resetFilters", "clearError"], "classes": [], "methods": [{"name": "fetchProducts", "description": "Async thunk to fetch products from the API."}, {"name": "fetchProductById", "description": "Async thunk to fetch a product by its ID from the API."}], "calls": ["axios.get"], "search-terms": ["productSlice", "fetchProducts", "fetchProductById", "setProducts", "applyFilters"], "state": 2, "file_id": 19, "knowledge_revision": 39, "git_revision": "", "ctags": [{"_type": "tag", "name": "API_BASE_URL", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^const API_BASE_URL = '\\/api';$/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "applyFilters", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  applyFilters, $/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "clearError", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  clearError $/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "error", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  error: null,$/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "fetchProductById", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^export const fetchProductById = createAsyncThunk<$/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "fetchProducts", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^export const fetchProducts = createAsyncThunk<$/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "filterOptions", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  filterOptions: {$/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "initialState", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^const initialState: ProductState = {$/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "loading", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  loading: false,$/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "pagination", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  pagination: {$/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "productSlice", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^const productSlice = createSlice({$/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "resetFilters", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  resetFilters, $/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "searchQuery", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^    searchQuery: '',$/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "setCurrentPage", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  setCurrentPage, $/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "setFilterOptions", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  setFilterOptions, $/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "setItemsPerPage", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  setItemsPerPage, $/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "setProducts", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  setProducts, $/", "language": "TypeScript", "kind": "constant"}, {"_type": "tag", "name": "setSelectedProduct", "path": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "pattern": "/^  setSelectedProduct, $/", "language": "TypeScript", "kind": "constant"}], "filename": "/home/kavia/workspace/e-commerce-integration-i01-e-commerce-spa-23456-23984-pre_prod/src/store/slices/productSlice.ts", "hash": "6d090c5d902c7d818fb9975664337e63", "format-version": 4, "code-base-name": "default", "revision_history": [{"39": ""}]}