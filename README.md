# Full stack ethereum blockchain app for Burger ordering page 

#### v0.1 in progress  :

  - [x] Create a Burger Struct
  - [x] Create an Order Struct
  - [x] Fetch Burgers and Orders Dynamically
  - [x] connect to ipfs for image uploading , storing hash in smartContract and using them on the front end




## __Here's how to deploy this project:__

1. Clone the repo
```shel
git clone https://github.com/gianniskok/e-burger.git
```
2. Go to my-app folder
```shel
cd my-app
```
3. Install the dependencies
```shel
sudo npm install 
```
4. Start the local test node
```shel
npx hardhat node
```
5. Deploy the contract
```shel
npx hardhat run scripts/deploy.js --network localhost
```
6. install metamask extention on chrome or firefox.
  - create user.
  - connect to localhost:8545 .
  - import account 0 and 1.
  _(Copy privare keys from harhat node for addresses 0 and 19, click on metamask extension, select import accounts and paste private keys)._
  Click [here](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account) for more info on metamask import accounts

7. Run the app
```shel
npm start
```


#### Feel free to contact me on giannis.kokkoros@hotmail.com for more info
