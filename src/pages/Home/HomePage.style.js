import styled from "styled-components";

const HomeWrapper = styled.div`
  height: 100vh;
  width: 100%;
  .sidebar {
    width: 80px;
    height: 100%;
    padding: 28px 22px;
    .logo {
      margin-bottom: 110px;
    }
  }
  .popular-ques {
    padding: 28px;
    height: 100%;
    width: 400px;
    min-width: 400px;
    background-color: #f4f4f8;
    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      letter-spacing: 0em;
      color: #1c1c1f;
      margin-bottom: 36px;
    }
    .threads-container {
      height: calc(100% - 60px);
      overflow: auto;
      .white-card {
        border-radius: 12px;
        padding: 12px 16px;
      }
      .chat-content {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
      }
    }
  }
  .message-chat {
    .top-container {
      height: calc(100% - 100px);
      padding: 94px 65px;
      overflow: auto;
      > p {
        font-size: 32px;
        font-weight: 600;
        line-height: 39px;
        letter-spacing: 0em;
      }
    }
    .input-chat {
      border-top: 1px solid #f4f4f8;
      padding: 20px 56px 30px 56px;
      input {
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        font-family: "Montserrat", sans-serif;
        border: none;
        background-color: #f7f8f8;
        padding: 12px 50px 12px 16px;
        border-radius: 22px;
        color: #000;
        outline: none;
        width: 100%;
        &::placeholder {
          color: #1c1c1f99;
        }
      }
      .mic-icon {
        position: absolute;
        right: 15px;
        top: 10px;
      }
    }
    .user-bg {
      background-color: #c4f0f2;
      padding: 16px 24px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      border-radius: 18px 18px 0px 18px;
      max-width: 700px;
      &.chat-bg {
        background-color: #f3f4f5;
        border-radius: 0 18px 18px 18px;
      }
    }
    table {
      thead {
        tr {
          background-color: #1c1c1f;
          th {
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 600;
            line-height: 14.63px;
            color: #fff;
            &:first-of-type {
              border-radius: 16px 0 0px 0px;
            }
            &:last-of-type {
              border-radius: 0 16px 0px 0px;
            }
          }
        }
      }
      tbody {
        tr {
          &:nth-of-type(even) {
            td {
              background-color: #f6f7f8;
            }
          }
          td {
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 400;
            line-height: 14.63px;
            background-color: #fff;
          }
        }
      }
    }
  }
`;

export { HomeWrapper };
