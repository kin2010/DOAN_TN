import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import ModalReivew from "../../components/ModalReview";
import { ProductContext } from "../../Context/ProductContext";
const cards = [
  {
    src: "../images/re/r1.png",
    name: "Kiều Trang",
    cmt: "Đúng là huyền thoại son dưỡng môi. Sử dụng rất thích, môi mềm mượt mà hồng nào nữa. Ship hàng nhanh. Tư vấn nhiệt tình :X",
  },
  {
    src: "../images/re/r2.jfif",
    name: "Nguyễn Lan Ngọc",
    cmt: "quá ok nè. Mình xài tươi tắn hẳn ra. ra nắng ko bị nhờn và nhẹ mặt kinh khủng.",
  },
  {
    src: "../images/re/r3.jfif",
    name: "Trần Văn A",
    cmt: "Sản phẩm quá tuyệt, ngoài sự mong đợi, mình sẽ đặt hàng nữa và tin tưởng ở shop",
  },
  {
    src: "../images/re/r4.jfif",
    name: "Nguyễn Trung Đức",
    cmt: "Cảm ơn shop đã giúp mình cải thiện làn da và yêu bản thân nhìu hơn",
  },
  {
    src: "../images/re/r5.jfif",
    name: "Văn Long",
    cmt: "quá tuyệt, mình đã vote 5 sao cho shop",
  },
];
export default function ReviewPage() {
  const { showModalReview, setShowReivew } = React.useContext(ProductContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [dataShow, setDataShow] = React.useState();
  const CardItem = ({ card, className }) => {
    const { src, name, cmt } = card;
    const handeClick = () => {
      setDataShow(card);
      setShowReivew(true);
    };
    return (
      <Card className={`${className}`} onClick={handeClick}>
        <CardMedia component="img" image={src} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cmt}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    );
  };
  return (
    <>
      <Container>
        <ModalReivew>
          <CardItem className="card-img2" card={dataShow}></CardItem>
        </ModalReivew>
        <h2 className="top text-center">Customer Reviews</h2>
        <Slider {...settings}>
          <Row className="d-flex flex-row">
            <Col>
              <CardItem card={cards[0]}></CardItem>
            </Col>
            <Col>
              <Row className="d-flex">
                <Col md={6} sm={12}>
                  <CardItem className="card-img" card={cards[1]}></CardItem>
                </Col>

                <Col md={6} sm={12}>
                  <CardItem className="card-img" card={cards[2]}></CardItem>
                </Col>

                <Col md={6} sm={12}>
                  <CardItem className="card-img" card={cards[3]}></CardItem>
                </Col>

                <Col md={6} sm={12}>
                  <CardItem className="card-img" card={cards[4]}></CardItem>
                </Col>
              </Row>
            </Col>
          </Row>
        </Slider>
      </Container>
    </>
  );
}
