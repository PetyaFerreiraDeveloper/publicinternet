class AddInternetSpeedsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :internet_speeds, id: :uuid do |t|
      t.references :place, null: false, foreign_key: true, index: true, type: :uuid
      t.float :download_speed, null: false, scale: 2, precision: 15  # 10 GB/s internet speed = 10000.00 MBps = 1000000.00 Kbps
      t.string :download_units, null: false


      # This adds created_at and updated_at by default
      t.timestamps
    end
  end
end
