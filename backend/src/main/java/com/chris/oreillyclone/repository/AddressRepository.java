package com.chris.oreillyclone.repository;

import com.chris.oreillyclone.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address,Long> {
}
