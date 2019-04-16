import React from "react";
import { Carousel } from "antd-mobile";

const Banner = ({ items }) => {
    if (!items.length) return null;
    return (
        <Carousel id="j-banner" autoplay={true} infinite>
            {items.map(val => (
                <a
                    key={val.id}
                    href={val.url}
                    style={{
                        display: "inline-block",
                        width: "100%"
                    }}
                >
                    <img
                        src={val.img_url}
                        style={{ width: "100%", verticalAlign: "top" }}
                        onLoad={() => {
                            window.dispatchEvent(new Event("resize"));
                        }}
                        alt="banner"
                    />
                </a>
            ))}
        </Carousel>
    );
};
export default Banner;
