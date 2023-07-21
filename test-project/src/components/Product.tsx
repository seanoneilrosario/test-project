"use client"
import addQuantities from "@/hook/quantityAdd";
import { useEffect, useRef, useState } from "react";

const Product = ({data}:any) => {
    const [arrayData, setArrayData] = useState<Array<any>>([]);
    let result;
    const variants = data.sizeOptions;
    const sizes:any = useRef(null);
    const cart:any = useRef(null);
    let children:any;


    const activeState = (e:any) => {
        e.target.parentNode.childNodes.forEach((child:any) => {
            child.classList.remove('active')
        })
        e.target.classList.add('active')
        e.target.parentElement.classList.add('selected')
    }

    useEffect(() => {
        children = sizes?.current?.childNodes;
    })

    const addToCart = (e:any) => {
        e.preventDefault();
        if (!e.target.children[0].classList.contains('selected')) {
            alert("Please Select a Size")
        } else {
            cart.current.classList.add('open')
        }
        children.forEach((item:any) => {
            if (item.classList.contains('active')) {
                const size = item.innerHTML;
                const dataCatcher:any = {
                    image: `${data.imageURL}`,
                    title: `${data.title}`,
                    quantity: 1,
                    price: `${data.price}`,
                    size: `${size}`,
                }
                setArrayData([...arrayData, dataCatcher])
            }
        })
    }
    result = addQuantities(arrayData);
    const size = arrayData.length;

    const CloseOpenCart = (e:any) => {
        const parent = e.target.parentElement;
        if (parent.classList.contains('open')) {
            parent.classList.remove('open');
        } else {
            parent.classList.add('open');
        }
    }
    
    useEffect(() => {
        console.log('passed')
    },[arrayData])

    
    return <>
        <div className="bg-[#f6f6f7] block w-[100%] mb-[40px] px-[10px] text-right">
            <div className="text-[#6f6f6e] text-[12px] cursor-pointer md:pr-[14.4vw]">
                <div ref={cart} className="relative max-w-[fit-content] ml-[auto]">
                    <p onClick={CloseOpenCart} className="text-[#000] py-[10px] relative z-[2] px-[10px]">My Cart <span>({size})</span></p>
                    {size != 0 && (
                        <div className="w-[300px] absolute right-[0] top-[100%] py-[10px] px-[10px] bg-[#fff] border-[1px] border-[#c5c5c5] cart_item mt-[-1px]">
                            {result && result.map((cartItem:any) => {
                                return <div className="flex h-[130px] py-[10px]">
                                    <div className="w-[35%]">
                                        <img className="w-[100%] h-[100%] object-contain" src={cartItem?.image} alt="" />
                                    </div>
                                    <div className="w-[65%] pl-[15px] text-left flex flex-col justify-between pb-[35px]">
                                        <h3 className="text-[#000]">{cartItem?.title}</h3>
                                        <p className="text-[#000]">{cartItem?.quantity}x <b>${cartItem.price}.00</b></p>
                                        <p className="text-[#000]">Size: {cartItem?.size}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    )}
                </div>
                
            </div>
        </div>
        <div className="md:flex">
            <div className="md:w-[50%] md:pl-[15vw]">
                <img alt="" src={data.imageURL} />
            </div>
            <div className="md:w-[50%] mt-[30px] md:mt-[0] md:ml-[40px] md:pr-[15vw]">
                <h2 className="text-[18px] font-[600]">
                    {data.title}
                </h2>
                <h3 className="text-[14px] font-[700] border-y-[1px] border-[#c5c5c5] py-[5px] my-[15px]">
                    ${data.price}.00
                </h3>
                <p className="text-[#686868] text-[14px]">
                    {data.description}
                </p>
                <div className="sizes mt-[30px]">
                    <p className="text-[#686868] font-[600] text-[12px] uppercase">Size<span className="text-[#cc0606]">*</span></p>
                    <form onSubmit={addToCart}>
                        <div ref={sizes} className="flex ml-[-5px] mb-[15px]">
                            {variants.map((variant:any,i:any) => {
                                return <div key={i} onClick={activeState} className="product_item cursor-pointer text-[14px] m-[5px] px-[17px] py-[7px] border-[2px] border-[#c5c5c5]" id={variant.id}>
                                    {variant.label}
                                </div>
                            })}
                        </div>
                        <button className="hover:bg-[#333] hover:text-[#fff] border-[3px] border-[#333] block uppercase text-[14px] font-[600] px-[18px] py-[5px]" type="submit" value="Submit">Add to cart</button>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default Product;