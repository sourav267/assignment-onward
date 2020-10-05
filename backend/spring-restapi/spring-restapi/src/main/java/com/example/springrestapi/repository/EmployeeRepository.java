package com.example.springrestapi.repository;

import com.example.springrestapi.model.Employee;
import com.example.springrestapi.model.EmployeeDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {
//    SELECT e.ename, e.empno, m.ename as manager, e.mgr
//            FROM
//    emp e, emp m
//    WHERE e.mgr = m.empno;
//    @Query("select e.id,e.employee_name, m.employee_name as manager from " +
//            "employee e, employee m where e.id = m.manager_id")
//    List<EmployeeDTO> findByEmployeeAndManager();
}