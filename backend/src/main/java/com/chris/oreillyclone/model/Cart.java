package com.chris.oreillyclone.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(name = "cart_items")
    private Set<CartItem> cartItems = new HashSet<>();

    @Column(name = "total_price")
    private double totalPrice;

    /**
     *   The cart doesn't own the information about cartitems
     *      CartItems should be the single source of truth
     */
    @Column(name = "total_items")
    private int totalItems;

    public void calculateTotalItems() {setTotalItems(cartItems.size());}

    public void calculateTotalPrice() {
        double sumPrice = 0;
        for(CartItem cartItem : this.cartItems) {
            sumPrice += cartItem.getPrice();
        }
        setTotalPrice(sumPrice);
    }

}
