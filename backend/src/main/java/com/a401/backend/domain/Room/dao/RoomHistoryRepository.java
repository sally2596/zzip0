package com.a401.backend.domain.Room.dao;

import com.a401.backend.domain.Room.domain.RoomHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomHistoryRepository extends JpaRepository<RoomHistory,Long> {


}
