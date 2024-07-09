import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchProducts,
  updateProducts,
  createProducts,
  deleteProducts,
} from "../../AdminServices";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography
} from "@mui/material";
import Notification from "../../../Notification/Notification"; // Adjust path as per your file structure

const truncateStyle = {
  maxWidth: "100px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default function EditProductsForm() {
  const [products, setProducts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    heading: "",
    content: "",
    video_link: "",
    link1: "",
    link2: "",
  });
  const [newProduct, setNewProduct] = useState({
    heading: "",
    content: "",
    video_link: "",
    link1: "",
    link2: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // Notification State
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success"); // Default to success

  const fetchData = async () => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({
      heading: product.heading,
      content: product.content,
      video_link: product.video_link,
      link1: product.link1,
      link2: product.link2,
    });
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    // Check if any required field is empty
    if (
      !updatedProduct.heading ||
      !updatedProduct.content ||
      !updatedProduct.video_link ||
      !updatedProduct.link1 ||
      !updatedProduct.link2
    ) {
      // Show error notification
      setNotificationSeverity("error");
      setNotificationMessage("All fields are required.");
      setNotificationOpen(true);
      return; // Exit function to prevent API call
    }

    try {
      const updatedData = await updateProducts(
        selectedProduct.id,
        updatedProduct
      );
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id ? updatedData : product
        )
      );
      fetchData();
      handleDialogClose();
      // Show success notification
      setNotificationSeverity("success");
      setNotificationMessage("Product updated successfully");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAddProduct = async () => {
    // Check if any required field is empty
    if (
      !newProduct.heading ||
      !newProduct.content ||
      !newProduct.video_link ||
      !newProduct.link1 ||
      !newProduct.link2
    ) {
      // Show error notification
      setNotificationSeverity("error");
      setNotificationMessage("All fields are required.");
      setNotificationOpen(true);
      return; // Exit function to prevent API call
    }

    try {
      const newProductData = await createProducts(newProduct);
      setProducts([...products, newProductData]);
      setNewProduct({
        heading: "",
        content: "",
        video_link: "",
        link1: "",
        link2: "",
      });
      setOpenAdd(false);
      fetchData();
      // Show success notification
      setNotificationSeverity("success");
      setNotificationMessage("Product added successfully");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleDeleteClick = (productId) => {
    setDeleteProductId(productId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProducts(deleteProductId);
      setProducts(products.filter((product) => product.id !== deleteProductId));
      setDeleteDialogOpen(false);
      // Show success notification
      setNotificationSeverity("success");
      setNotificationMessage("Product deleted successfully");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteProductId(null);
    setDeleteDialogOpen(false);
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <>
      <Typography variant="h5" component="h5">
      Edit Product
    </Typography>
      <Button style={{marginTop:"10px"}} variant="contained" color="primary" onClick={handleAddClick}>
        Add Products
      </Button>
      <TableContainer component={Paper} style={{marginTop:"10px",maxHeight: "500px", overflow: "auto"}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Video</TableCell>
              <TableCell>Link 1</TableCell>
              <TableCell>Link 2</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.heading}</TableCell>
                <TableCell>{product.content}</TableCell>
                <TableCell style={truncateStyle}>
                  {product.video_link ? (
                    <a
                      href={product.video_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.video_link}
                    </a>
                  ) : (
                    "No Link"
                  )}
                </TableCell>
                <TableCell style={truncateStyle}>
                  {product.link1 ? (
                    <a
                      href={product.link1}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.link1}
                    </a>
                  ) : (
                    "No Link"
                  )}
                </TableCell>
                <TableCell style={truncateStyle}>
                  {product.link2 ? (
                    <a
                      href={product.link2}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.link2}
                    </a>
                  ) : (
                    "No Link"
                  )}
                </TableCell>
                <TableCell>
                  <Button
                
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Product Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="heading"
            label="Heading"
            type="text"
            fullWidth
            value={updatedProduct.heading}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={updatedProduct.content}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="video_link"
            label="Video Link"
            type="text"
            fullWidth
            value={updatedProduct.video_link}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="link1"
            label="Link 1"
            type="text"
            fullWidth
            value={updatedProduct.link1}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="link2"
            label="Link 2"
            type="text"
            fullWidth
            value={updatedProduct.link2}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Product Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="heading"
            label="Heading"
            type="text"
            fullWidth
            value={newProduct.heading}
            onChange={handleNewInputChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={newProduct.content}
            onChange={handleNewInputChange}
          />
          <TextField
            margin="dense"
            name="video_link"
            label="Video Link"
            type="text"
            fullWidth
            value={newProduct.video_link}
            onChange={handleNewInputChange}
          />
          <TextField
            margin="dense"
            name="link1"
            label="Link 1"
            type="text"
            fullWidth
            value={newProduct.link1}
            onChange={handleNewInputChange}
          />
          <TextField
            margin="dense"
            name="link2"
            label="Link 2"
            type="text"
            fullWidth
            value={newProduct.link2}
            onChange={handleNewInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Component */}
      <Notification
        open={notificationOpen}
        handleClose={handleNotificationClose}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
}
