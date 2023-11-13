import React from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ItemBox from "../Nav/ItemBox";

const UserForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const [axiosSecure]= useAxiosSecure()
  const navigate= useNavigate()
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=f9ac07b10a13ed0f0fc1151de85b1d26`;
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            age,dateOfBirth,fathersName,guranterAddress, guranterMobile,guranterName,ifPaidRegular, installmentType,interestRate,
            lastDateOfPayment,mobileNumber,mothersName,name,parmanentAddress,pastProductTake,presentAddress,primaryDeposit,productDetails,
            productName,profession,purchaseDate,sellPrice, userSerialNo, customerType,nid} = data;
            const newData={ age,dateOfBirth,fathersName,guranterAddress, guranterMobile,guranterName,ifPaidRegular, installmentType,interestRate,
              lastDateOfPayment,mobileNumber,mothersName,name,parmanentAddress,pastProductTake,presentAddress,primaryDeposit,productDetails,
              productName,profession,purchaseDate,sellPrice,userSerialNo,customerType,nid, image:imgURL}
              axiosSecure.post('/clientData', newData)
              .then(data => {
                if(data.insertedId){
                  toast.success("User created successfully");
                }
                navigate("/users")
                console.log('after successful data sending to server', data.data);
              })
        }
      });
  };
  return (
    <>
    <ItemBox/>
    <Container className="formContainer">
      <div className="formDiv">
        <h4 className="userClass">পণ্য ক্রয় ফর্ম:</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fistElements ">  
          <div className="photos">
              <input
                className="fileForm"
                // onChange={(e) => setImage(e.target.files[0])}
                {...register("image")}
                type="file"
              />
            </div>
            <p className="photoFrame">Photo</p>
            <div className="nameDivesee">
              <p>সদস্য নং- </p>
              <div className="inputDiv">
              <input
                {...register("userSerialNo", { required: true, maxLength: 120 })}
                className="textInp"

                // onChange={(e) => setName(e.target.value)}
              />
            </div>
            </div>
            <div className="officerName mt-3">
              <p>ফিল্ড অফিসার: </p>
              <div className="inputDiv">
              <input
                {...register("fieldofficername", { required: true, maxLength: 120 })}
                className="textInp"

                // onChange={(e) => setName(e.target.value)}
              />
            </div>
              </div>
              <div className="fieldArea">
              <div className="officerName">
              <p> ফিল্ড এরিয়া: </p>
              <div className="inputDiv">
              <input
                {...register("fieldarea", { required: true, maxLength: 120 })}
                className="textInp"

                // onChange={(e) => setName(e.target.value)}
              />
            </div>
              </div>
              </div>
            <div className="nameDiv">
              <p>1. নাম: </p>
            </div>
            <div className="inputDiv">
              <input
                {...register("name", { required: true, maxLength: 120 })}
                className="textInp"

                // onChange={(e) => setName(e.target.value)}
              />
            </div>
           
          </div>
          <div className="fistElements">
            <div className="nameDiv">
              <p>2. পিতার নাম: </p>
            </div>
            <div className="inputDiv">
              <input
                className="textInp"
                {...register("fathersName", { required: true, maxLength: 120 })}

                // onChange={(e) => setFatherName(e.target.value)}
              />
            </div>
          </div>
          <div className="fistElements">
            <div className="nameDiv">
              <p>3. মাতার নাম: </p>
            </div>
            <div className="inputDiv">
              <input
                className="textInp"
                {...register("mothersName", { required: true, maxLength: 120 })}
                // onChange={(e) => setMotherName(e.target.value)}
              />
            </div>
          </div>
          <div className="fistElements">
            <div className="nameDiv">
              <p>4. বর্তমান ঠিকানা: </p>
            </div>
            <div className="inputDiv">
              <input
                className="textInp"
                {...register("presentAddress", {
                  required: true,
                  maxLength: 120,
                })}

                // onChange={(e) => setPresentAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="fistElements">
            <div className="nameDiv">
              <p>5. স্থায়ী ঠিকানা: </p>
            </div>
            <div className="inputDiv">
              <input
                className="textInp"
                {...register("parmanentAddress", {
                  required: true,
                  maxLength: 120,
                })}
                // onChange={(e) => setParmanentAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="fistElements">
            <div className="nameDiv">
              <p>6.মোবাইল নম্বর: </p>
            </div>
            <div className="inputDiv">
              <input
                className="textInp"
                {...register("mobileNumber", {
                  required: true,
                  maxLength: 120,
                })}
                // onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="fistElements">
            <div className="nameDiv">
              <p>7. জাতীয় পরিচয়পত্র নম্বর: </p>
            </div>
            <div className="inputDiv">
              <input
                className="textInp"
                {...register("nid", {
                  required: true,
                  maxLength: 120,
                })}
                // onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="tempGrid mt-2">
            <div className="names">
              <p className="ptag pe-2">8. পেশা: </p>
              <input
                className="textInp"
                {...register("profession")}
                // onChange={(e) => setProfession(e.target.value)}
                required
              />
            </div>
            <div className="names">
              <p className="ptag pe-2">9. জন্ম তারিখ: </p>
              <input
                className="textInp"
                type="date"
                {...register("dateOfBirth", { required: true, maxLength: 120 })}

                // onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="names">
              <p className="ptag pe-2">10. বয়স: </p>
              <input
                className="textInp"
                {...register("age", { required: true, maxLength: 120 })}

                // onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          <div className="detailsOfP mt-2">
            <p className="pe-2">11. আবেদনকৃত পণ্য/নগদ টাকার বিবরণ: </p>
            <div className="inputTitle">
              <select
                className="selectClasss"
                {...register("customerType", {
                  required: true,
                  maxLength: 120,
                })}
                // onChange={(e) => setPastProductTake(e.target.value)}
              >
                  <option value="select">নির্বাচন করুন</option>
                  <option value="cash">নগদ টাকা</option>
                  <option value="product">পণ্য</option>
              </select>
            </div>
          </div>

          <div className="tempGrids">
            <div className="names">
              <p className="ptag pe-2"> (ক) পণ্যের নাম </p>
              <input
                className="textInp"
                {...register("productName", { required: true, maxLength: 120 })}
                // onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="names">
              <p className="ptag pe-2">(খ) পণ্যের বিবরণ </p>
              <input
                className="textInp"
                {...register("productDetails", {
                  required: true,
                  maxLength: 120,
                })}
                // onChange={(e) => setProductDetails(e.target.value)}
              />
            </div>
          </div>

          <div className="names pt-3">
            <p>12. অর্থ প্রদানের বিবরণ: </p>
          </div>

          <div className="tempGrids">
            <div className="names">
              <p className="ptag pe-2"> (ক) পণ্যের বিক্রয়মূল্য: </p>
              <input
                className="textInp"
                {...register("sellPrice", {
                  required: true,
                  maxLength: 120,
                })}
                // onChange={(e) => setPurchaseAmount(e.target.value)}
              />
            </div>
            <div className="names">
              <p className="ptag pe-2">(খ) প্রাথমিক জমার পরিমান: </p>
              <input
                className="textInp"
                {...register("primaryDeposit", {
                  required: true,
                  maxLength: 120,
                })}
                // onChange={(e) => setPrimaryDeposit(e.target.value)}
              />
            </div>
            <div className="names">
              <p className="ptag pe-2">(গ) পণ্য ক্রয়ের তারিখ: </p>
              <input
                className="textInp"
                {...register("purchaseDate", {
                  required: true,
                  maxLength: 120,
                })}
                type="date"

                // onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
            <div className="names">
              <p className="ptag pe-2">(ঘ) বকেয়া পরিশোধের শেষ তারিখ: </p>
              <input
                className="textInp"
                {...register("lastDateOfPayment", {
                  required: true,
                  maxLength: 120,
                })}
                type="date"

                // onChange={(e) => setLastDateOfPayment(e.target.value)}
              />
            </div>
          </div>

          <div className="names pt-3">
            <p>13. কিস্তি পরিশোধের বিবরণ: </p>
          </div>
          <div className="tempGrids">
            <div className="names">
              <p className="ptag pe-2">(ক) কিস্তি প্রদানের ধরন:</p>
              <div className="inputTitle">
                <select
                  className="selectClass"
                  {...register("installmentType", {
                    required: true,
                    maxLength: 120,
                  })}
                  // onChange={(e) => setInstallmentType(e.target.value)}
                >
                  <option value="select">নির্বাচন করুন</option>
                  <option value="weekly">সাপ্তাহিক</option>
                  <option value="monthly">মাসিক</option>
                </select>
              </div>
            </div>
          </div>
          <div className="namess">
            <p className="newNames">14.ইতিপূর্বে কোন পণ্য গ্রহণ করেছেন? </p>
            <div className="inputTitle">
              <select
                className="selectClasss"
                {...register("pastProductTake", {
                  required: true,
                  maxLength: 120,
                })}
                // onChange={(e) => setPastProductTake(e.target.value)}
              >
                <option value="select">নির্বাচন করুন</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="namess">
            <p className="newNames">15.পণ্যের মূল্য নিয়মিত পরিশোধ করেছেন? </p>
            <div className="inputTitle">
              <select
                className="selectClasss"
                {...register("ifPaidRegular", {
                  required: true,
                  maxLength: 120,
                })}
                // onChange={(e) => setPaidRegularly(e.target.value)}
              >
                <option value="select">নির্বাচন করুন</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="namessss pt-3">
            <p>16. গ্যারান্টার বা নিশ্চয়তা প্রদানকারীর বিবরণ: </p>
          </div>
          <div className="tempGrid mt-2">
            <div className="names">
              <p className="ptag pe-2"> গ্যারান্টারের নাম: </p>
              <input
                className="textInp"
                {...register("guranterName", {
                  required: true,
                  maxLength: 120,
                })}

                // onChange={(e) => setGuardianName(e.target.value)}
              />
            </div>
            <div className="names">
              <p className="ptag pe-2">ঠিকানা: </p>
              <input
                className="textInp"
                {...register("guranterAddress", {
                  required: true,
                  maxLength: 120,
                })}

                // onChange={(e) => setGuardianAddress(e.target.value)}
              />
            </div>
            <div className="names">
              <p className="ptag pe-2">মোবাইল নং: </p>
              <input
                className="textInp"
                {...register("guranterMobile", {
                  required: true,
                  maxLength: 120,
                })}

                // onChange={(e) => setGuardianMobile(e.target.value)}
              />
            </div>
          </div>

          <div className="names pt-3">
            <p>17. অঙ্গীকারনামা: </p>
          </div>
          <div className="angikarnama">
            <p>
              উপরোক্ত সকল বিষয়ের তথ্য ও উপাত্ত সঠিক ও নির্ভূল তাই জেনে, বুঝে আমি
              সজ্ঞানে অত্র প্রতিষ্ঠানের নিকট থেকে পণ্য বাকিতে ক্রয় করিলাম এবং
              নিশ্চয়তা দিচ্ছি যে, আমি সাপ্তাহিক কিস্তি মুনাফাসহ প্রতি সপ্তাহে
              পরিশোধ করব এবং প্রতিষ্ঠানের কার্যক্রম সম্পর্কিত সকল নিয়ম কানুন
              মেনে চলব।
            </p>
          </div>
          <input
            className="productInputBTN mb-5"
            type="submit"
            name="Submit"
            id=""
            value="Submit"
          />
        </form>
      </div>
    </Container>
    </>
  );
};

export default UserForm;
