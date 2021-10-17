//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";




contract CreateBurger {
    using Counters for Counters.Counter;
    Counters.Counter private _burgersIds;
    Counters.Counter private _ordersIds;



    address payable public owner ;  

    constructor() {
        console.log("Creating new apartment factory:" );
        owner = payable(msg.sender);
    }

    struct Burger {
        uint burgersId;
        uint price;
        string imageLink;
        string ingredients;
        uint availableBurgers;
    }

    struct Order {
        uint orderId;
        uint burgersId;
        uint quantity;
        bool completed;
    }

    mapping(uint256 => Burger) public idToBurger;
    mapping(uint256 => Order) public idToOrder;

    event BurgerCreated (
        uint indexed burgersId,
        uint256 price,
        string imageLink,
        string ingredients,
        uint availableBurgers
    );

    event OrderCreated (
        uint indexed ordersId,
        uint burgersId,
        uint quantity,
        bool completed
    );

    function burgerImageLink(uint256 _burgersId) public view returns (string memory) {
        string memory imageLink = idToBurger[_burgersId].imageLink;
        return imageLink;
    }

    function fetchBurgersCreated() public view returns (Burger[] memory) {
        uint burgerCount =  _burgersIds.current();
        Burger[] memory burgers = new Burger[](burgerCount);
        uint currentIndex = 0;
        for (uint i = 0; i < burgerCount; i++) {
            uint currentId = i +1;
            Burger storage currentBurger = idToBurger[currentId];
            burgers[currentIndex] = currentBurger;
            currentIndex +=1;
        }
        return burgers;
    }

    function fetchOrdersCreated() public view returns (Order[] memory) {
        uint orderCount =  _ordersIds.current();
        uint256 availableOrders = 0;
        for(uint  i = 0; i < orderCount; i++){
            if(idToOrder[i+1].completed == false){
                availableOrders++;
            }
        }
        Order[] memory orders = new Order[](availableOrders);
        uint currentIndex = 0;
        for (uint i = 0; i < orderCount; i++) {
            if(idToOrder[i+1].completed == false){
                uint currentId = i +1;
                Order storage currentOrder = idToOrder[currentId];
                orders[currentIndex] = currentOrder;
                currentIndex +=1;
            }            
        }
        return orders;
    }

    function createBurger (uint256 _price, string memory _imageLink , string memory _ingredients, uint256 _availableBurgers)  public payable {
        require(_price > 0, "Price must be at least 1 wei");
        

        _burgersIds.increment();
        uint256 burgersId = _burgersIds.current();
        idToBurger[burgersId] = Burger(
            burgersId,
            _price,
            _imageLink,
            _ingredients,
            _availableBurgers
        );

        emit BurgerCreated(
            burgersId,
            _price,
            _imageLink,
            _ingredients,
            _availableBurgers
        );
    }

    function createOrder (uint256 _burgerId, uint256 _quantity)  public payable {
        _ordersIds.increment();
        uint256 ordersId = _ordersIds.current();
        idToOrder[ordersId] = Order(
            ordersId,
            _burgerId,
            _quantity,
            false
        );

        emit OrderCreated(
            ordersId,
            _burgerId,
            _quantity,
            false
        );
    }


    function getBurgerPrice(uint256 _burgerId) public view returns (uint256) {
        uint256 priceAp = idToBurger[_burgerId].price;
        return priceAp;
    }  

    function getAvailableBurgers(uint256 _burgerId) public view returns (uint256) {
        uint256 availableB = idToBurger[_burgerId].availableBurgers;
        return availableB;
    }

    function setAvailableBurgers(uint256 _burgerId, uint256 _number) public {
        idToBurger[_burgerId].availableBurgers = _number;
    }

    function buyBurger(uint256 _burgerId, uint256 _quantity) payable public {
        require(msg.value == _quantity * idToBurger[_burgerId].price, "Not enough money");
        require(_quantity <= idToBurger[_burgerId].availableBurgers, "Not enough burgers");
        owner.transfer(msg.value);
        idToBurger[_burgerId].availableBurgers -=_quantity;
        createOrder(_burgerId, _quantity);
    }

    function completeOrder(uint256 _orderID) public {
        require(idToOrder[_orderID].completed==false,"Already completed");
        idToOrder[_orderID].completed = true;
    }
}
