package com.demo.bookstore.security;

import java.util.HashMap;
import java.util.Map;

public enum AppRole {
    ROLE_ADMIN("admin"),
    ROLE_SELLER("seller");

    public final String value;

    AppRole(String value) {
        this.value = value;
    }

    private static final Map<String, AppRole> map = new HashMap<>();

    static {
        for (AppRole appRole : AppRole.values()) {
            map.put(appRole.value, appRole);
        }
    }

    public static AppRole get(String value) {
        return map.get(value);
    }
}
