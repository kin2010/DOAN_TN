import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '../Rating';
import './index.scss';
import { Chip } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import { addCart } from '../../Slice/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

export const IconProduct = styled(Button)((props) => ({
  opacity: 1,
  background: '#fff',
  color: `${props.theme.colors.main}`,
  minWidth: 0,
  borderRadius: '100rem',
  border: `1px solid ${props.theme.colors.main}`,
  padding: '12px',
  ':focus': {
    border: `1px solid ${props.theme.colors.main}`,
  },
  '>svg': {},
  ':hover': {
    backgroundColor: `${props.theme.colors.main}`,
    color: '#fff',
  },
}));
export const StyledName = styled(Typography)((props) => ({
  //textShadow: ' 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c, -2px -1px 14px #CE5937',
  fontSize: '18px',
}));
export const Product = React.forwardRef(({ product, chip }, ref) => {
  const dispatch = useDispatch();
  const { avatar, trademark, name, src, rating, price } = product;
  const handleAddCart = () => {
    console.log(product);
    dispatch(addCart(product));
  };
  const mapChip = (chip) => {
    switch (chip) {
      case 'sale': {
        return 'warning';
      }
      case 'hot': {
        return 'error';
      }
      case 'new': {
        return 'success';
      }
      default: {
        return 'info';
      }
    }
  };
  const mapColor = {
    sale: 'warning',
    hot: 'error',
    new: 'success',
  };

  const [showIcon, setShowIcon] = React.useState(false);
  return (
    <Card
      style={{ position: 'relative' }}
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
      className="product mb-5"
      sx={{ maxWidth: 345 }}
    >
      <CardMedia component="img" image={avatar} alt="green iguana" />
      <CardContent className="text-center">
        <Chip className="chip" label={chip} color={mapColor[chip]} />
        <Typography className="mb-2" variant="body2" color="text.secondary">
          {trademark?.name}
        </Typography>
        <StyledName className="mb-2" gutterBottom variant="h6" component="div">
          {name}
        </StyledName>

        <Rating className="mb-2" rating={rating || 5}></Rating>
        <h4 className="price">
          {price ? Number.parseInt(price).toLocaleString() : 999}đ
        </h4>
      </CardContent>
      {showIcon && (
        <CardActions className="product-icons">
          <IconProduct className="success ">
            <FavoriteIcon className=""></FavoriteIcon>
          </IconProduct>
          <IconProduct onClick={() => handleAddCart()} className="success ">
            <AddShoppingCartIcon></AddShoppingCartIcon>
          </IconProduct>
          <IconProduct className="success ">
            <VisibilityIcon className=""></VisibilityIcon>
          </IconProduct>
        </CardActions>
      )}
    </Card>
  );
});
export default Product;
