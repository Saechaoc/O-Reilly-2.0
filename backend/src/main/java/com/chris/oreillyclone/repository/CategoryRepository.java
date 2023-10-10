package com.chris.oreillyclone.repository;


import com.chris.oreillyclone.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface CategoryRepository extends JpaRepository<Category,Long> {

    @Query("Select c from Category c where c.name = ?1")
    Category findCategoryByName(String name);

    @Query("select c from Category c where c.name = ?1 and c.parentCategory.name = ?2")
    Category findByNameAndParent(String level, String parent);

}
