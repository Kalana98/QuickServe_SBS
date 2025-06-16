package com.epiclanka.bookingsysbackend.repository;

import com.epiclanka.bookingsysbackend.entity.Reservation;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findAllByCompanyId(Long companyId);

    List<Reservation> findAllByUserId(Long userId);

    Page<Reservation> findAllByUserId(Long userId, Pageable pageable);

    Page<Reservation> findAllByCompanyId(Long companyId, Pageable pageable);

}
