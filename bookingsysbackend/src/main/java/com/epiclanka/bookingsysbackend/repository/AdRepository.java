package com.epiclanka.bookingsysbackend.repository;

import com.epiclanka.bookingsysbackend.entity.Ad;
import com.epiclanka.bookingsysbackend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {

    List<Ad> findAllByUserId(Long userId);

    List<Ad> findAllByServiceNameContaining(String name);

    Page<Ad> findAllByUser_Id(Long userId, Pageable pageable);


    Long user(User user);
}
