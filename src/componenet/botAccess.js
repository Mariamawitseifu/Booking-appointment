import React, { useState } from 'react';
import axios from 'axios';
import { IoAttach } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import background from "../assets/tg_back.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbLayoutSidebar } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { RiMessageFill } from "react-icons/ri";
import '../componenet/bot_style.css'

const BotAccess = () => {
  const [message, setMessage] = useState('Write Message Here...');
  const [response, setResponse] = useState(null);
  const [sendBtn, setSendBtn] = useState('Send');
  const [error, setError] = useState(null);
  const [buttonColor, setButtonColor] = useState("#4D7EFD");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const chnageBtn = async (e) => {
      
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendBtn('Sending...');

    const formData = new FormData();
    formData.append('message', message);
    formData.append('file', image);
    
    if (image) {
      formData.append('img_found', 'true');
    } else {
      formData.append('img_found', 'false');
    }

    try {
      const res = await axios.post('http://168.119.150.187:3000/webhook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponse(res.data["status"]);
      setSendBtn("Send Success")
      setButtonColor("green")
      setTimeout(() => {
        setButtonColor('#4D7EFD');
        setSendBtn("Send")
      }, 1500);
    } catch (err) {
      setButtonColor("red")
      setResponse(err);
      setSendBtn("Unable to Send!")
      setTimeout(() => {
        setButtonColor('#4D7EFD');
        setSendBtn("Send")
      }, 1500);
    }
  };

  const tg_style = {
    backgroundImage: `url(${background})`,
  };

  return (
    <div className='con'>
      <div className='con1'>
        <form onSubmit={handleSubmit}>
          <div className='div1'>
            <div className='icon_div'>
              <FiAlertTriangle />
            </div>
            <div className='text_div'>
              <h2>Attention</h2>
              <p>This message will be sent to all bot users.<br/> 
              Ensure the content is thoroughly checked<br/> as it cannot be edited once sent.</p>
            </div>
          </div>
          <div className='div2'>
            <textarea
              className='Input_text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className='div3'>
            <div className='file_div'>
              <IoAttach />
              <input
                className='Input_File'
                type="file" 
                onChange={handleImageChange} 
              />
            </div>
            <button style={{backgroundColor: buttonColor}} className='Input_button' type="submit">{sendBtn}</button>
          </div>
        </form>
      </div>
      <div className='con2'>
        <div className='tg_div1'>
          <div className='heading_div'>
            <h2 className='bot_name'>Droga Pharmacy Bot</h2>
            <h2 className='bot_txt'>bot</h2>
          </div>
          <BsThreeDotsVertical />
          <TbLayoutSidebar />
          <IoIosSearch />
        </div>
        <div style={tg_style} className='tg_div2'>
          <div className='chat_box'>
            <div className='msg_box'>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
              )}
              <div className='msg_text'>{message}</div>
            </div>
            <RiMessageFill />
          </div>
        </div>
        <div className='tg_div3'>
          <IoAttach />
          <p className='write_msg'>Write a message...</p>
          <IoMdSend />
          <BsEmojiSmile />
        </div>
      </div>
    </div>
  );
};

export default BotAccess;
