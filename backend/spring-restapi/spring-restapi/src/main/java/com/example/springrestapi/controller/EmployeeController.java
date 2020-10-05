package com.example.springrestapi.controller;

import com.example.springrestapi.model.Employee;
import com.example.springrestapi.model.EmployeeDTO;
import com.example.springrestapi.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employee")
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @PostMapping("/employee")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

//    @GetMapping("/getAllEmployeeManagerName")
//    public List<EmployeeDTO> getAllEmployeeManagerName(){
//        return employeeRepository.findByEmployeeAndManager();
//    }

    @DeleteMapping("/employee/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long empId) throws Exception {
        Employee employee =
                employeeRepository.findById(empId).orElseThrow(() -> new Exception());
        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
