import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ShopContext } from '../../Context/ShopContext';

const ShopDrop = ({ cate }) => {
  const subs = useSelector((state) => state.category.subCategories);
  const subFromCate = (idCate) => {
    if (subs) {
      return subs.filter((sub) => sub.categoryId === idCate);
    }
  };
  const { setSubProduct } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={cate.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} unmountOnExit>
        <List component="div" disablePadding>
          {subFromCate(cate._id).map((sub, index) => (
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => setSubProduct(sub?._id)}
              key={index}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={sub.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default ShopDrop;
