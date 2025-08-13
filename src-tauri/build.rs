fn main() {
    // Skip Windows resource generation to avoid requiring icons during dev
    std::env::set_var("TAURI_SKIP_WINDOWS_RESOURCE", "true");
    tauri_build::build();
}


